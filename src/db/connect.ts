import neo4j from "neo4j-driver"

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env

let cachedDriver = null as any;

const connectionDB = async () => {
   

    if (cachedDriver) {
        console.log('Using cached Neo4j driver');
        return cachedDriver;
    }
    const driver = neo4j.driver("neo4j+s://3f0d22cd.databases.neo4j.io", neo4j.auth.basic("neo4j", "cbRvEek3bxP7IvQGR_l_MpFSGrjCoNK_4xvivUnveuc"));

    cachedDriver = driver;
    return driver;
}

export default connectionDB;