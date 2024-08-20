export function getNameInitals(name){
    const splitName = name.name.toUpperCase().split(' ');
    if(splitName.length > 1){
        return splitName[0][0] + splitName[1][0]
       
    }

    return splitName[0][0];
 
}