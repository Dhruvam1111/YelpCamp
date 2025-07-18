const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000) + 1;
        const price = Math.floor(Math.random() * 20) + 10; 
        const camp = new campground({
            // YOUR USER ID
            author: '6872869411a3ff966eaa4fdb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis ex sint culpa aliquid voluptas expedita repudiandae. Labore quaerat eaque sint optio, enim assumenda vel libero qui illum nemo aperiam! Iste.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/didu3onhs/image/upload/v1752669799/YelpCamp/tuvswday3s3ocglnnffz.jpg',
                    filename: 'YelpCamp/aiyjd7dyrgwxhor0grji',
                },
                {
                    url: 'https://res.cloudinary.com/didu3onhs/image/upload/v1752662534/ron-barabash--1XZwd6ijnQ-unsplash_1_pxie3f.jpg',
                    filename: 'YelpCamp/rm918vutapdyygwx5mjy',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
