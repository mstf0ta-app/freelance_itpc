export const globalUrl = 'https://haithamdev.com/api/'
export const globalUrlBase = 'https://haithamdev.com'

export const saveLocal = (itemName,data)=>{
    const jsonData = JSON.stringify(data)
    localStorage.setItem(itemName,jsonData);
    return true
}


export const getLocal = (itemName)=>{
    const data = localStorage.getItem(itemName);
    const parsedData = JSON.parse(data)
    return parsedData
}



export const getData = (name, callback) => {
    fetch(globalUrl + name)
      .then((resp) => resp.json())
      .then((jsonData) => callback(jsonData))
      .catch((err) => console.log(err));
  };


export const addData = (name,data, callback) => {
let options = {
    method: "post",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
};
fetch(globalUrl + name, options)
    .then((resp) => resp.json())
    .then((jsonData) => callback(null, jsonData))
    .catch((err) => callback(err.message, null));
};


export const updateData = (name,data, callback) => {
    let options = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(globalUrl + name, options)
      .then((resp) => resp.json())
      .then((jsonData) => callback(null, jsonData))
      .catch((err) => callback(err.message, null));
  };


export const deleteData = (name,id, callback) => {
let options = {
    method: "delete",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
};
fetch(globalUrl + name, options)
    .then((resp) => resp.json())
    .then((jsonData) => callback(null, jsonData))
    .catch((err) => callback(err.message, null));
};