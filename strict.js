function test(a = () => b, b = 10) {
  console.log(a()); 
}
test();

// ✅ Works (b initialized before a)
function valid(b = 2, a = b * 3) {
  console.log(a, b); // 6, 2
}

// ❌ TDZ Error (a tries to use b before init)
function invalid(a = b * 3, b = 2) {
  console.log(a, b);
}
invalid(); // ReferenceError: b is not defined