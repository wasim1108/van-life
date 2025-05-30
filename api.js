import { initializeApp } from "firebase/app"
import { getFirestore, 
    collection, 
    getDocs, 
    doc, 
    getDoc,
    query,
    where    
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
  authDomain: "vanlife-a1af5.firebaseapp.com",
  projectId: "vanlife-a1af5",
  storageBucket: "vanlife-a1af5.appspot.com",
  messagingSenderId: "803007000356",
  appId: "1:803007000356:web:446cd3a1ca406839258db1"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const vansSnapshot = await getDocs(vansCollectionRef)
    const vansList = vansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return vansList
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const docSnapshot = await getDoc(docRef)
    // console.log(docSnapshot)
    if (!docSnapshot.exists()) {
        throw new Error(`Van with id ${id} not found`)
    }
    return {
        id: docSnapshot.id,
        ...docSnapshot.data()
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123")) // Replace "123" with the actual hostId
    const vansSnapshot = await getDocs(q)
    const vansList = vansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    
    return vansList // Replace "123" with the actual hostId
}

export async function getHostVan(id) {
    const docRef = doc(db, "vans", id)
    const docSnapshot = await getDoc(docRef)
    
    if (!docSnapshot.exists()) {
        throw new Error(`Van with id ${id} not found`)
    }
    
    return {
        id: docSnapshot.id,
        ...docSnapshot.data()
    }
}



// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}