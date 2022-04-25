
# Munros-app
Submission Final Version for Public


A React Native application designed and created for IOS. Designed aroung hiking and planning.



## API Reference

#### Get Specific Munro

Created by:  https://twitter.com/johneas10.


```http
  GET https://munroapi.herokuapp.com/munros/name/${MunroName}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `MunroName`      | `string` | **Required**. Name of Munro to fetch |

Exampler return:

`[{"name":"Ben Nevis","height":1344,"gridref_letters":"NN","gridref_eastings":"16675","gridref_northings":"71283","latlng_lat":56.796849,"latlng_lng":-5.003525,"smcid":"M001","metoffice_loc_id":"350377","region":"Loch Linnhe to Loch Ericht","meaning":"Possibly from an old Gaelic word meaning venomous"}] `



## Features

- Difficult Sorting
- Map Integration
- Custom Ratings
- Cross platform
- Simple and Functional UI
- Notes with DateTime Stamps stored persistenly access devices local storage(hardware)
- Munro Lat and Long from API
- Secure Registration & Login using Firebase
- Full CRUD functionailty on Notes
- Tick Off Completed Munros
- Camera access(hardware)
- Images stored and retrevied from Cloudinary API
- Suitable understandable errors on registration and login
- Compass (hardware)


