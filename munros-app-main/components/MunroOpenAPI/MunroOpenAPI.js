const MunroOpenAPI = async(munroname) => {
    
    let response = await fetch('https://munroapi.herokuapp.com/munros/name/' + munroname) //provided by https://twitter.com/johneas10.
    let data = await response.json();
    return data;
    
}

export default MunroOpenAPI;


