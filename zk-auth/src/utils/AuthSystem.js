import init, { get_pass_hash as wasmGetPassHash, generate_proof as wasmGenerateProof, verify_proof as wasmVerifyProof } from '../pkg/zk_wasm.js';

// Initialize WASM module
export const initializeWasm = async () => {
  try {
    await init();
    console.log('WASM initialized successfully');
  } catch (error) {
    console.error('Failed to initialize WASM:', error);
  }
};

// Wrapper for get_pass_hash
export const get_pass_hash = async (password) => {
  await initializeWasm();
  return await wasmGetPassHash(password);
};

// Wrapper for generate_proof
export const generate_proof = async (username, password) => {
  await initializeWasm();
  return await wasmGenerateProof(username, password);
};

// Wrapper for verify_proof
export const verify_proof = async (proof, passHash, username) => {
  await initializeWasm();
  return await wasmVerifyProof(proof, passHash, username);
};
