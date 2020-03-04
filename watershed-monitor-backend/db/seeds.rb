map1 = {
    name: "TestMap 1"
}

map2 = {
    name: "TestMap 2"
}


obs1 = {
    name: "test1",
    category: "Violation",
    description: "Manure spread on fields after allowed date",
    latitude: 44.811345,
    longitude: -73.149572,
    map_id: 1
}

obs2 = {
    name: "test2",
    category: "Best Practice",
    description: "Cover crops used extensively",
    latitude: 44.819235,
    longitude: -73.137827,
    map_id: 1
}

obs3 = {
    name: "test3",
    category: "Data",
    description: "fake data",
    latitude: 44.808884,
    longitude: -73.169820,
    map_id: 1
}

obs4 = {
    name: "test4",
    category: "Violation",
    description: "cows grazing in floodplain",
    latitude: 45.007420,
    longitude: -73.091199,
    map_id: 2
}

obs5 = {
    name: "test5",
    category: "Best Practice",
    description: "Stormwater diverted and contained in catchment system",
    latitude: 44.958852,
    longitude: -73.164499,
    map_id: 2
}

obs6 = {
    name: "test6",
    category: "Data",
    description: "fake data",
    latitude: 44.935890, 
    longitude: -73.196943,
    map_id: 2
}

Map.create(map1)
Map.create(map2)

Observation.create(obs1)
Observation.create(obs2)
Observation.create(obs3)
Observation.create(obs4)
Observation.create(obs5)
Observation.create(obs6)