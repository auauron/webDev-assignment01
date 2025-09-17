const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(__dirname));

const data = [
    {
        gender: "female",
        name: {
            title: "Ms",
            first: "Emma",
            last: "Johnson"
        },
        location: {
            street: {
                number: 1234,
                name: "Oak Street"
            },
            city: "Springfield",
            state: "Illinois",
            country: "United States",
            postcode: "62701",
            coordinates: {
                latitude: "39.7817",
                longitude: "-89.6501"
            },
            timezone: {
                offset: "-6:00",
                description: "Central Time (US & Canada), Mexico City"
            }
        },
        email: "emma.johnson@example.com",
        login: {
            uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            username: "emmaj123",
            password: "password123",
            salt: "salt123",
            md5: "md5hash",
            sha1: "sha1hash",
            sha256: "sha256hash"
        },
        dob: {
            date: "1990-05-15T08:30:00.000Z",
            age: 33
        },
        registered: {
            date: "2015-03-20T12:00:00.000Z",
            age: 8
        },
        phone: "(555) 123-4567",
        cell: "(555) 987-6543",
        id: {
            name: "SSN",
            value: "123-45-6789"
        },
        picture: {
            large: "https://randomuser.me/api/portraits/women/1.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/1.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/1.jpg"
        },
        nat: "US"
    },
    {
        gender: "male",
        name: {
            title: "Mr",
            first: "James",
            last: "Smith"
        },
        location: {
            street: {
                number: 5678,
                name: "Main Avenue"
            },
            city: "Austin",
            state: "Texas",
            country: "United States",
            postcode: "73301",
            coordinates: {
                latitude: "30.2672",
                longitude: "-97.7431"
            },
            timezone: {
                offset: "-6:00",
                description: "Central Time (US & Canada), Mexico City"
            }
        },
        email: "james.smith@example.com",
        login: {
            uuid: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
            username: "jamessmith",
            password: "mypassword",
            salt: "salt456",
            md5: "md5hash2",
            sha1: "sha1hash2",
            sha256: "sha256hash2"
        },
        dob: {
            date: "1985-12-03T14:20:00.000Z",
            age: 38
        },
        registered: {
            date: "2018-07-10T09:15:00.000Z",
            age: 5
        },
        phone: "(555) 234-5678",
        cell: "(555) 876-5432",
        id: {
            name: "SSN",
            value: "987-65-4321"
        },
        picture: {
            large: "https://randomuser.me/api/portraits/men/2.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/2.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/2.jpg"
        },
        nat: "US"
    },
    {
        gender: "female",
        name: {
            title: "Mrs",
            first: "Sarah",
            last: "Davis"
        },
        location: {
            street: {
                number: 9012,
                name: "Pine Road"
            },
            city: "Seattle",
            state: "Washington",
            country: "United States",
            postcode: "98101",
            coordinates: {
                latitude: "47.6062",
                longitude: "-122.3321"
            },
            timezone: {
                offset: "-8:00",
                description: "Pacific Time (US & Canada)"
            }
        },
        email: "sarah.davis@example.com",
        login: {
            uuid: "c3d4e5f6-g7h8-9012-cdef-345678901234",
            username: "sarahd",
            password: "securepass",
            salt: "salt789",
            md5: "md5hash3",
            sha1: "sha1hash3",
            sha256: "sha256hash3"
        },
        dob: {
            date: "1992-08-22T11:45:00.000Z",
            age: 31
        },
        registered: {
            date: "2020-01-15T16:30:00.000Z",
            age: 3
        },
        phone: "(555) 345-6789",
        cell: "(555) 765-4321",
        id: {
            name: "SSN",
            value: "456-78-9012"
        },
        picture: {
            large: "https://randomuser.me/api/portraits/women/3.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/3.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/3.jpg"
        },
        nat: "US"
    },
    {
        gender: "male",
        name: {
            title: "Mr",
            first: "Michael",
            last: "Brown"
        },
        location: {
            street: {
                number: 3456,
                name: "Elm Street"
            },
            city: "Denver",
            state: "Colorado",
            country: "United States",
            postcode: "80201",
            coordinates: {
                latitude: "39.7392",
                longitude: "-104.9903"
            },
            timezone: {
                offset: "-7:00",
                description: "Mountain Time (US & Canada)"
            }
        },
        email: "michael.brown@example.com",
        login: {
            uuid: "d4e5f6g7-h8i9-0123-defg-456789012345",
            username: "mikebrown",
            password: "password456",
            salt: "salt012",
            md5: "md5hash4",
            sha1: "sha1hash4",
            sha256: "sha256hash4"
        },
        dob: {
            date: "1988-03-10T09:15:00.000Z",
            age: 35
        },
        registered: {
            date: "2017-11-05T14:20:00.000Z",
            age: 6
        },
        phone: "(555) 456-7890",
        cell: "(555) 654-3210",
        id: {
            name: "SSN",
            value: "789-01-2345"
        },
        picture: {
            large: "https://randomuser.me/api/portraits/men/4.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/4.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/4.jpg"
        },
        nat: "US"
    },
    {
        gender: "female",
        name: {
            title: "Miss",
            first: "Jessica",
            last: "Wilson"
        },
        location: {
            street: {
                number: 7890,
                name: "Maple Drive"
            },
            city: "Miami",
            state: "Florida",
            country: "United States",
            postcode: "33101",
            coordinates: {
                latitude: "25.7617",
                longitude: "-80.1918"
            },
            timezone: {
                offset: "-5:00",
                description: "Eastern Time (US & Canada), Bogota, Lima"
            }
        },
        email: "jessica.wilson@example.com",
        login: {
            uuid: "e5f6g7h8-i9j0-1234-efgh-567890123456",
            username: "jessicaw",
            password: "mypass789",
            salt: "salt345",
            md5: "md5hash5",
            sha1: "sha1hash5",
            sha256: "sha256hash5"
        },
        dob: {
            date: "1995-11-28T16:00:00.000Z",
            age: 28
        },
        registered: {
            date: "2019-09-12T10:45:00.000Z",
            age: 4
        },
        phone: "(555) 567-8901",
        cell: "(555) 543-2109",
        id: {
            name: "SSN",
            value: "012-34-5678"
        },
        picture: {
            large: "https://randomuser.me/api/portraits/women/5.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/5.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/5.jpg"
        },
        nat: "US"
    }
];

function getRandomUsers(count) {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = [];
    
    for (let i = 0; i < count; i++) {
        selected.push(shuffled[i % shuffled.length]);
    }
    
    return selected;
}

app.get('/api', (req, res) => {
    const results = parseInt(req.query.results) || 1;
    const users = getRandomUsers(results);
    
    const response = {
        results: users,
        info: {
            seed: "abc123",
            results: results,
            page: 1,
            version: "1.4"
        }
    };
    
    res.json(response);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ahronIndex.html'));
});

app.listen(PORT, () => {
    console.log(`Random User API server running on http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api`);
    console.log(`API with results: http://localhost:${PORT}/api?results=5`);
});
