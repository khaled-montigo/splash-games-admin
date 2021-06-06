export const UnderscoreCapitalize = (name) =>{
    const HasUnderscore = name.includes("_");
    if(!HasUnderscore){
        return name;
    }
   let i, newName = name.split('_');
    for (i=0; i<newName.length; i++) {
        if(i === 0){
            newName[i] = newName[i];
        }else{
            newName[i] = newName[i].charAt(0).toUpperCase() + newName[i].slice(1);
        }
    }
    newName = newName.join('');
    return newName;
}