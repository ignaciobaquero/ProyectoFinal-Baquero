
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfigEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasEnv = Boolean(import.meta.env?.VITE_FIREBASE_API_KEY);

const firebaseConfig = hasEnv ? firebaseConfigEnv : firebaseConfigReal;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



const MOCK_PRODUCTS = [
  { id: '1', title: 'Gorra New Era', description: 'Visera color azul', price: 6500, image: 'https://acdn-us.mitiendanube.com/stores/001/015/914/products/new-era-la-dodgers-59fifty-fitted-cap-blue1-c023a319653e17767116781356065075-480-0.webp' },
  { id: '2', title: 'Gorra LA', description: 'Visera color roja', price: 7200, image: 'https://www.newera.com.ar/cdn/shop/files/11591141_59FIFTY_MLBBASICFITTED_LOSDOD_SCA_3QL.jpg?v=1761767013' },
  { id: '3', title: 'Gorra Sex', description: 'Visera negra', price: 5800, image: 'https://www.newera.com.ar/cdn/shop/files/11591167_59FIFTY_MLBBASICFITTED_CHIWHI_BLKWHI_3QL_grande.jpg?v=1761242007' },
  { id: '4', title: 'Gorra Boston', description: 'Visera color crema', price: 3200, image: 'https://dbz8g93w027an.cloudfront.net/229000-superlarge_default/Gorra-Boston-Red-Sox-MLB-59Fifty-Beige.jpg' }
];


export async function fetchProducts() {
  try {
    const colRef = collection(db, "products");
    const snap = await getDocs(colRef);

    if (snap.empty) {
      console.warn("⚠️ Firestore vacío, usando mock");
      return MOCK_PRODUCTS;
    }

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error obteniendo productos → usando mock", err);
    return MOCK_PRODUCTS;
  }
}



export async function fetchProductById(id) {
  try {
    const ref = doc(db, "products", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) throw new Error("Producto no encontrado");

    return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error("Error Firestore → usando mock");
    return MOCK_PRODUCTS.find(p => p.id === id);
  }
}


export async function saveOrder(order) {
  try {
    const ordersCol = collection(db, "orders");
    const docRef = await addDoc(ordersCol, order);
    return docRef.id;
  } catch (err) {
    console.error("Error guardando orden → mock", err);
    return "MOCK-" + Date.now();
  }
}


export default db;
