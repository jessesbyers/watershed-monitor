obs1 = {
    name: "Bedard Farm",
    description: "Manure spread on fields over snow after allowed date",
    latitude: 44.811345,
    longitude: -73.149572,
    category_id: 1
}

obs2 = {
    name: "SweetPea Gardens",
    description: "Cover crops used extensively during fall and spring seasons",
    latitude: 44.819235,
    longitude: -73.137827,
    category_id: 2
}

obs3 = {
    name: "Hathaway Point",
    description: "Toxic Blue-Green Algae Bloom - no swimming allowed",
    latitude: 44.808884,
    longitude: -73.169820,
    category_id: 3
}

obs4 = {
    name: "Stevens Brook",
    description: "Cows grazing in floodplain without fencing",
    latitude: 44.802736381572714,
    longitude: -73.11476287841796,
    category_id: 1
}

obs5 = {
    name: "Private Residence",
    description: "Stormwater diverted and contained in water catchment system",
    latitude: 44.845837509069824,
    longitude: -73.10240325927734,
    category_id: 2
}

obs6 = {
    name: "Private Well",
    description: "Nitrate level significantly above safe drinking water level",
    latitude: 44.82270814193098,
    longitude: -73.07699737548828,
    category_id: 3
}

Category.create(name: "Violations")
Category.create(name: "Best Practices")
Category.create(name: "Water Quality Data")


Observation.create(obs1)
Observation.create(obs2)
Observation.create(obs3)
Observation.create(obs4)
Observation.create(obs5)
Observation.create(obs6)