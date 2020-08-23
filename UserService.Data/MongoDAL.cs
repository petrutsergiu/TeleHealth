using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserService.Data
{
    public class MongoDAL
    {
        public void GetMongo()
        {
            MongoClient dbClient = new MongoClient("mongodb+srv://SergiuUser:Password!123@cluster0.ct4no.azure.mongodb.net/Cluster0?retryWrites=true&w=majority");

            var collection = dbClient.GetDatabase("User").GetCollection<BsonDocument>("User");
            var filter = Builders<BsonDocument>.Filter.Eq("name", "Sergiu");
            //var document = new BsonDocument { { "name", "Sergiu" }, { "Value", "great" } };
            //collection.InsertOne(document);
            //foreach (var db in dbList.fi)
            //{
            //    Console.WriteLine(db);
            //}
            var x = collection.Find(filter).FirstOrDefault().GetElement("_id");

        }
    }
}
