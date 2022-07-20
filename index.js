const mhs = [
    {
        id: 1,
        name: "julia",
        age: 21,
    },
];

if (mhs[0].name === null || mhs[0].name === undefined) {
    console.info("mahasiswa tidak memasukan nama");
} else {
    console.info("mahasiswa memasukan nama");
}