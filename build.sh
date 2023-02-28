#!/bin/bash

cargo install wasm-gc
cargo build --target wasm32-unknown-unknown --release
wasm-gc target/wasm32-unknown-unknown/release/golden_triangle_graph.wasm
vite-build
