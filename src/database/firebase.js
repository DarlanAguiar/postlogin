import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC78uH7W_visZbGpxA_g41j4_2-GxAJKXw",
  authDomain: "post-7235e.firebaseapp.com",
  projectId: "post-7235e",
  storageBucket: "post-7235e.appspot.com",
  messagingSenderId: "498234609918",
  appId: "1:498234609918:web:8763af2dcf678a31df15af",
};

 export const firebaseApp = initializeApp(firebaseConfig);



const db = getFirestore();

export const salvarDados = (data, userBD) => {
  addDoc(collection(db, userBD), data);
  
};

export const fetchData = async (userDB) => {
  //console.log(typeof user)
  const result = await getDocs(query(collection(db, userDB)));
  let arrayData = [];

  result.docs.map((data) => {
    arrayData.push({
      id: data.id,
      title: data.data().title,
      message: data.data().message,
      checkList: data.data().checkList,
      date: data.data().date,
      editDate: data.data().editDate,
    });
  });

  //console.log(arrayData);

  return arrayData
};

export const deleteData = async (id, userBD) => {
  
  await deleteDoc(doc(db, userBD, id));
};

export const updateData = async (data, userBD) => {
  const id = data.id
  await updateDoc(doc(db, userBD, id), data);
};
