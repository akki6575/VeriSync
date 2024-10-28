import init, { get_pass_hash, generate_proof, verify_proof, print_string } from '../pkg/zk_wasm.js'; // Adjust the path as necessary

// Initialize the WASM module
let wasmInitialized = false;

async function initializeWasm() {
    if (!wasmInitialized) {
        await init();
        wasmInitialized = true; // Mark the WASM as initialized
    }
}

// Hash password function
export async function hashPassword(password) {
    await initializeWasm();
    if (typeof get_pass_hash === "function") {
        try {
            const hashedPassword = get_pass_hash(password);
            console.log("Password hashed successfully:", hashedPassword);
            return hashedPassword; // Ensure this is the correct type
        } catch (error) {
            console.error("Error hashing password:", error);
            throw new Error("Hashing failed: " + error.message); // Include the error message
        }
    } else {
        console.error("get_pass_hash function not found in wasmModule");
        throw new Error("Hashing function not found");
    }
}

// Create proof function
export async function createProof(username, password) {
    await initializeWasm();
    if (typeof generate_proof === "function") {
        try {
            const proof = generate_proof(Number(username), String(password)); // Convert username to a number
            console.log("Proof generated successfully:", proof);
            return proof; // Ensure this is the correct type
        } catch (error) {
            console.error("Error generating proof:", error);
            throw new Error("Proof generation failed: " + error.message); // Include the error message
        }
    } else {
        console.error("generate_proof function not found in wasmModule");
        throw new Error("Proof generation function not found");
    }
}

// Verify proof function
export async function verifyZKProof(proof, hashedPassword, username) {
    await initializeWasm(); // Ensure WASM is initialized
    if (typeof verify_proof === "function") {
        try {
            // Call the verify_proof function
            const verificationResult = verify_proof(proof, [hashedPassword], Number(username)); // Ensure hashedPassword is in an array and username is a number
            console.log("Verification result:", verificationResult);
            return verificationResult; 
        } catch (error) {
            // Enhanced error logging
            console.error("Error verifying proof:", error);
            throw new Error("Proof verification failed: " + error.message);
        }
    } else {
        console.error("verify_proof function not found in wasmModule");
        throw new Error("Proof verification function not found");
    }
}

// Print string function
export async function printString(value) {
    await initializeWasm();
    if (typeof print_string === "function") {
        try {
            print_string(value); 
        } catch (error) {
            console.error("Error printing string:", error);
            throw new Error("Print function failed: " + error.message); // Include the error message
        }
    } else {
        console.error("print_string function not found in wasmModule");
        throw new Error("Print function not found");
    }
}
