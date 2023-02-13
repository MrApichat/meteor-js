import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { TestsCollection } from "/imports/api/tests";
import bodyParser from "body-parser";

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

// Picker.middleware(bodyParser.urlencoded({ extended: false }));
// Picker.middleware(bodyParser.json());

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    await insertLink({
      title: "Follow the Guide",
      url: "https://guide.meteor.com",
    });

    await insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    await insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }
});

Router.route("/tests", { where: "server" })
  .get(function () {
    var response;
    response = TestsCollection.find().fetch();
    this.response.setHeader("Content-Type", "application/json");
    this.response.end(JSON.stringify(response));
  })
  .post((req, res) => {
    var response;
    // console.log(req.query)
    TestsCollection.insert(req.body);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "create successful" }));
  });
