const goldModel = require('../models/allgold.schema');
const silverModel = require('../models/allsilver.schema');

exports.postGoldData = async (req, res) => {
    try {
        const obj = {
            Jan: [
                { price: "18.575" },
                { price: "23.575" },
                { price: "44.575" },
                { price: "34.575" },
                { price: "31.575" },
                { price: "45.575" },
                { price: "55.575" },
                { price: "67.575" },
                { price: "55.575" },
                { price: "65.575" },
                { price: "45.575" },
                { price: "43.575" },
                { price: "24.575" },
                { price: "64.575" },
                { price: "54.575" },
                { price: "67.575" },
                { price: "64.575" },
                { price: "44.575" },
                { price: "46.575" },
                { price: "43.575" },
                { price: "33.575" },
                { price: "37.575" },
                { price: "45.575" },
                { price: "23.575" },
                { price: "32.575" },
                { price: "13.575" },
                { price: "43.575" },
                { price: "64.575" },
                { price: "67.575" },
                { price: "62.575" },
                { price: "57.575" },
            ],
            Feb: [
                { price: "18.575" },
                { price: "28.175" },
                { price: "38.271" },
                { price: "63.372" },
                { price: "43.573" },
                { price: "34.575" },
                { price: "12.575" },
                { price: "11.575" },
                { price: "5.575" },
                { price: "12.575" },
                { price: "22.575" },
                { price: "23.575" },
                { price: "45.575" },
                { price: "55.575" },
                { price: "63.575" },
                { price: "54.575" },
                { price: "65.575" },
                { price: "78.575" },
                { price: "82.575" },
                { price: "60.575" },
                { price: "55.575" },
                { price: "59.575" },
                { price: "52.575" },
                { price: "42.575" },
                { price: "12.575" },
                { price: "23.575" },
                { price: "34.575" },
                { price: "65.575" },
            ],

            Mar: [
                { price: "68.475" },
                { price: "54.541" },
                { price: "23.575" },
                { price: "54.175" },
                { price: "33.475" },
                { price: "11.545" },
                { price: "12.574" },
                { price: "23.571" },
                { price: "54.575" },
                { price: "23.575" },
                { price: "35.575" },
                { price: "32.575" },
                { price: "34.175" },
                { price: "54.575" },
                { price: "34.575" },
                { price: "12.575" },
                { price: "24.575" },
                { price: "12.575" },
                { price: "28.575" },
                { price: "35.575" },
                { price: "41.575" },
                { price: "23.575" },
                { price: "34.575" },
                { price: "56.575" },
                { price: "64.575" },
                { price: "56.575" },
                { price: "76.575" },
                { price: "45.575" },
                { price: "34.575" },
                { price: "54.575" },
                { price: "28.575" },
            ],
            Apr: [
                { price: "38.474" },
                { price: "48.474" },
                { price: "48.484" },
                { price: "89.474" },
                { price: "38.464" },
                { price: "49.479" },
                { price: "69.445" },
                { price: "47.474" },
                { price: "17.363" },
                { price: "27.373" },
                { price: "18.282" },
                { price: "18.373" },
                { price: "38.383" },
                { price: "93.383" },
                { price: "38.374" },
                { price: "94.494" },
                { price: "48.484" },
                { price: "84.484" },
                { price: "46.474" },
                { price: "57.686" },
                { price: "39.484" },
                { price: "74.478" },
                { price: "58.585" },
                { price: "48.585" },
                { price: "48.485" },
                { price: "18.373" },
                { price: "28.822" },
                { price: "37.473" },
                { price: "35.383" },
                { price: "36.387" },
            ],
            May: [
                { price: "57.584" },
                { price: "64.484" },
                { price: "94.474" },
                { price: "38.464" },
                { price: "37.474" },
                { price: "37.474" },
                { price: "38.383" },
                { price: "36.484" },
                { price: "39.383" },
                { price: "48.484" },
                { price: "48.484" },
                { price: "38.383" },
                { price: "28.282" },
                { price: "69.372" },
                { price: "38.383" },
                { price: "39.383" },
                { price: "29.372" },
                { price: "83.333" },
                { price: "38.331" },
                { price: "92.328" },
                { price: "38.383" },
                { price: "47.438" },
                { price: "48.484" },
                { price: "84.484" },
                { price: "47.387" },
                { price: "48.474" },
                { price: "90.363" },
                { price: "63.374" },
                { price: "37.464" },
                { price: "18.282" },
                { price: "27.390" },
            ],
            Jun: [
                { price: "46.478" },
                { price: "58.474" },
                { price: "48.474" },
                { price: "49.484" },
                { price: "18.182" },
                { price: "17.373" },
                { price: "28.383" },
                { price: "37.833" },
                { price: "38.383" },
                { price: "54.484" },
                { price: "39.373" },
                { price: "84.474" },
                { price: "47.474" },
                { price: "94.474" },
                { price: "48.474" },
                { price: "93.437" },
                { price: "46.474" },
                { price: "37.436" },
                { price: "46.474" },
                { price: "48.474" },
                { price: "89.472" },
                { price: "83.374" },
                { price: "27.370" },
                { price: "37.484" },
                { price: "47.575" },
                { price: "487.944" },
                { price: "93.383" },
                { price: "73.370" },
                { price: "63.387" },
                { price: "63.383" },
            ],
            Jul: [
                { price: "46.474" },
                { price: "28.464" },
                { price: "45.460" },
                { price: "29.374" },
                { price: "38.474" },
                { price: "27.373" },
                { price: "76.475" },
                { price: "24.373" },
                { price: "28.263" },
                { price: "94.464" },
                { price: "36.373" },
                { price: "83.622" },
                { price: "20.472" },
                { price: "17.165" },
                { price: "19.373" },
                { price: "64.474" },
                { price: "74.474" },
                { price: "94.484" },
                { price: "37.384" },
                { price: "64.474" },
                { price: "93.383" },
                { price: "37.474" },
                { price: "38.464" },
                { price: "47.464" },
                { price: "74.474" },
                { price: "93.364" },
                { price: "46.374" },
                { price: "45.874" },
                { price: "47.474" },
                { price: "46.474" },
                { price: "484.474" },
            ],
            Aug: [
                { price: "47.484" },
                { price: "48.484" },
                { price: "30.474" },
                { price: "20.437" },
                { price: "89.474" },
                { price: "64.464" },
                { price: "10.282" },
                { price: "28.263" },
                { price: "37.644" },
                { price: "84.464" },
                { price: "84.467" },
                { price: "36.437" },
                { price: "46.474" },
                { price: "90.464" },
                { price: "84.373" },
                { price: "73.474" },
                { price: "38.374" },
                { price: "49.474" },
                { price: "16.833" },
                { price: "78.373" },
                { price: "83.373" },
                { price: "93.364" },
                { price: "37.364" },
                { price: "99.371" },
                { price: "92.363" },
                { price: "47.474" },
                { price: "79.474" },
                { price: "68.575" },
                { price: "36.474" },
                { price: "96.894" },
                { price: "66.474" },
            ],
            Sep: [
                { price: "68.575" },
                { price: "34.367" },
                { price: "63.363" },
                { price: "44.373" },
                { price: "59.363" },
                { price: "35.383" },
                { price: "90.363" },
                { price: "92.633" },
                { price: "77.633" },
                { price: "88.373" },
                { price: "63.733" },
                { price: "28.353" },
                { price: "34.367" },
                { price: "34.373" },
                { price: "52.373" },
                { price: "73.363" },
                { price: "12.373" },
                { price: "11.543" },
                { price: "16.272" },
                { price: "23.248" },
                { price: "99.353" },
                { price: "77.633" },
                { price: "63.633" },
                { price: "93.538" },
                { price: "35.383" },
                { price: "33.733" },
                { price: "98.333" },
                { price: "35.387" },
                { price: "47.464" },
                { price: "36.733" },
            ],
            Oct: [
                { price: "68.575" },
                { price: "38.333" },
                { price: "10.282" },
                { price: "17.282" },
                { price: "62.373" },
                { price: "37.393" },
                { price: "93.387" },
                { price: "73.383" },
                { price: "83.638" },
                { price: "84.383" },
                { price: "63.360" },
                { price: "28.575" },
                { price: "48.675" },
                { price: "32.975" },
                { price: "40.474" },
                { price: "86.464" },
                { price: "87.644" },
                { price: "54.474" },
                { price: "43.346" },
                { price: "45.474" },
                { price: "45.478" },
                { price: "97.474" },
                { price: "34.373" },
                { price: "26.344" },
                { price: "46.474" },
                { price: "84.484" },
                { price: "63.474" },
                { price: "53.347" },
                { price: "41.393" },
                { price: "35.383" },
                { price: "55.402" },
            ],
            Nov: [
                { price: "39.383" },
                { price: "99.484" },
                { price: "64.474" },
                { price: "40.298" },
                { price: "20.373" },
                { price: "38.384" },
                { price: "83.438" },
                { price: "87.474" },
                { price: "28.473" },
                { price: "60.372" },
                { price: "77.437" },
                { price: "37.386" },
                { price: "48.484" },
                { price: "67.484" },
                { price: "35.464" },
                { price: "64.478" },
                { price: "74.484" },
                { price: "87.484" },
                { price: "48.498" },
                { price: "36.484" },
                { price: "63.383" },
                { price: "87.533" },
                { price: "36.383" },
                { price: "10.108" },
                { price: "16.372" },
                { price: "15.222" },
                { price: "24.381" },
                { price: "90.282" },
                { price: "55.283" },
                { price: "68.575" },
            ],
            Dec: [
                { price: "64.455" },
                { price: "34.565" },
                { price: "63.555" },
                { price: "45.654" },
                { price: "75.456" },
                { price: "89.575" },
                { price: "83.456" },
                { price: "56.745" },
                { price: "90.654" },
                { price: "67.435" },
                { price: "34.653" },
                { price: "88.343" },
                { price: "25.546" },
                { price: "38.736" },
                { price: "15.635" },
                { price: "19.299" },
                { price: "29.638" },
                { price: "39.363" },
                { price: "76.737" },
                { price: "37.363" },
                { price: "83.383" },
                { price: "22.383" },
                { price: "67.369" },
                { price: "18.202" },
                { price: "27.787" },
                { price: "66.353" },
                { price: "77.352" },
                { price: "99.363" },
                { price: "41.910" },
                { price: "55.610" },
                { price: "20.367" },
            ]
        }

        const goldData = new goldModel(obj);
        // console.log(goldData);
        const saveData = await goldData.save();
        return res.status(201).send(saveData);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.postSilverData = async (req, res) => {
    try {
        const obj = {
            Jan: [
                { price: "64.455" },
                { price: "34.565" },
                { price: "63.555" },
                { price: "45.654" },
                { price: "75.456" },
                { price: "89.575" },
                { price: "83.456" },
                { price: "56.745" },
                { price: "90.654" },
                { price: "67.435" },
                { price: "34.653" },
                { price: "88.343" },
                { price: "25.546" },
                { price: "38.736" },
                { price: "15.635" },
                { price: "19.299" },
                { price: "29.638" },
                { price: "39.363" },
                { price: "76.737" },
                { price: "37.363" },
                { price: "83.383" },
                { price: "22.383" },
                { price: "67.369" },
                { price: "18.202" },
                { price: "27.787" },
                { price: "66.353" },
                { price: "77.352" },
                { price: "99.363" },
                { price: "41.910" },
                { price: "55.610" },
                { price: "20.367" },
            ],
            Feb: [
                { price: "18.575" },
                { price: "28.175" },
                { price: "38.271" },
                { price: "63.372" },
                { price: "43.573" },
                { price: "34.575" },
                { price: "12.575" },
                { price: "11.575" },
                { price: "5.575" },
                { price: "12.575" },
                { price: "22.575" },
                { price: "23.575" },
                { price: "45.575" },
                { price: "55.575" },
                { price: "63.575" },
                { price: "54.575" },
                { price: "65.575" },
                { price: "78.575" },
                { price: "82.575" },
                { price: "60.575" },
                { price: "55.575" },
                { price: "59.575" },
                { price: "52.575" },
                { price: "42.575" },
                { price: "12.575" },
                { price: "23.575" },
                { price: "34.575" },
                { price: "65.575" },
            ],

            Mar: [
                { price: "68.475" },
                { price: "54.541" },
                { price: "23.575" },
                { price: "54.175" },
                { price: "33.475" },
                { price: "11.545" },
                { price: "12.574" },
                { price: "23.571" },
                { price: "54.575" },
                { price: "23.575" },
                { price: "35.575" },
                { price: "32.575" },
                { price: "34.175" },
                { price: "54.575" },
                { price: "34.575" },
                { price: "12.575" },
                { price: "24.575" },
                { price: "12.575" },
                { price: "28.575" },
                { price: "35.575" },
                { price: "41.575" },
                { price: "23.575" },
                { price: "34.575" },
                { price: "56.575" },
                { price: "64.575" },
                { price: "56.575" },
                { price: "76.575" },
                { price: "45.575" },
                { price: "34.575" },
                { price: "54.575" },
                { price: "28.575" },
            ],
            Apr: [
                { price: "38.474" },
                { price: "48.474" },
                { price: "48.484" },
                { price: "89.474" },
                { price: "38.464" },
                { price: "49.479" },
                { price: "69.445" },
                { price: "47.474" },
                { price: "17.363" },
                { price: "27.373" },
                { price: "18.282" },
                { price: "18.373" },
                { price: "38.383" },
                { price: "93.383" },
                { price: "38.374" },
                { price: "94.494" },
                { price: "48.484" },
                { price: "84.484" },
                { price: "46.474" },
                { price: "57.686" },
                { price: "39.484" },
                { price: "74.478" },
                { price: "58.585" },
                { price: "48.585" },
                { price: "48.485" },
                { price: "18.373" },
                { price: "28.822" },
                { price: "37.473" },
                { price: "35.383" },
                { price: "36.387" },
            ],
            May: [
                { price: "57.584" },
                { price: "64.484" },
                { price: "94.474" },
                { price: "38.464" },
                { price: "37.474" },
                { price: "37.474" },
                { price: "38.383" },
                { price: "36.484" },
                { price: "39.383" },
                { price: "48.484" },
                { price: "48.484" },
                { price: "38.383" },
                { price: "28.282" },
                { price: "69.372" },
                { price: "38.383" },
                { price: "39.383" },
                { price: "29.372" },
                { price: "83.333" },
                { price: "38.331" },
                { price: "92.328" },
                { price: "38.383" },
                { price: "47.438" },
                { price: "48.484" },
                { price: "84.484" },
                { price: "47.387" },
                { price: "48.474" },
                { price: "90.363" },
                { price: "63.374" },
                { price: "37.464" },
                { price: "18.282" },
                { price: "27.390" },
            ],
            Jun: [
                { price: "46.478" },
                { price: "58.474" },
                { price: "48.474" },
                { price: "49.484" },
                { price: "18.182" },
                { price: "17.373" },
                { price: "28.383" },
                { price: "37.833" },
                { price: "38.383" },
                { price: "54.484" },
                { price: "39.373" },
                { price: "84.474" },
                { price: "47.474" },
                { price: "94.474" },
                { price: "48.474" },
                { price: "93.437" },
                { price: "46.474" },
                { price: "37.436" },
                { price: "46.474" },
                { price: "48.474" },
                { price: "89.472" },
                { price: "83.374" },
                { price: "27.370" },
                { price: "37.484" },
                { price: "47.575" },
                { price: "487.944" },
                { price: "93.383" },
                { price: "73.370" },
                { price: "63.387" },
                { price: "63.383" },
            ],
            Jul: [
                { price: "46.474" },
                { price: "28.464" },
                { price: "45.460" },
                { price: "29.374" },
                { price: "38.474" },
                { price: "27.373" },
                { price: "76.475" },
                { price: "24.373" },
                { price: "28.263" },
                { price: "94.464" },
                { price: "36.373" },
                { price: "83.622" },
                { price: "20.472" },
                { price: "17.165" },
                { price: "19.373" },
                { price: "64.474" },
                { price: "74.474" },
                { price: "94.484" },
                { price: "37.384" },
                { price: "64.474" },
                { price: "93.383" },
                { price: "37.474" },
                { price: "38.464" },
                { price: "47.464" },
                { price: "74.474" },
                { price: "93.364" },
                { price: "46.374" },
                { price: "45.874" },
                { price: "47.474" },
                { price: "46.474" },
                { price: "484.474" },
            ],
            Aug: [
                { price: "47.484" },
                { price: "48.484" },
                { price: "30.474" },
                { price: "20.437" },
                { price: "89.474" },
                { price: "64.464" },
                { price: "10.282" },
                { price: "28.263" },
                { price: "37.644" },
                { price: "84.464" },
                { price: "84.467" },
                { price: "36.437" },
                { price: "46.474" },
                { price: "90.464" },
                { price: "84.373" },
                { price: "73.474" },
                { price: "38.374" },
                { price: "49.474" },
                { price: "16.833" },
                { price: "78.373" },
                { price: "83.373" },
                { price: "93.364" },
                { price: "37.364" },
                { price: "99.371" },
                { price: "92.363" },
                { price: "47.474" },
                { price: "79.474" },
                { price: "68.575" },
                { price: "36.474" },
                { price: "96.894" },
                { price: "66.474" },
            ],
            Sep: [
                { price: "68.575" },
                { price: "34.367" },
                { price: "63.363" },
                { price: "44.373" },
                { price: "59.363" },
                { price: "35.383" },
                { price: "90.363" },
                { price: "92.633" },
                { price: "77.633" },
                { price: "88.373" },
                { price: "63.733" },
                { price: "28.353" },
                { price: "34.367" },
                { price: "34.373" },
                { price: "52.373" },
                { price: "73.363" },
                { price: "12.373" },
                { price: "11.543" },
                { price: "16.272" },
                { price: "23.248" },
                { price: "99.353" },
                { price: "77.633" },
                { price: "63.633" },
                { price: "93.538" },
                { price: "35.383" },
                { price: "33.733" },
                { price: "98.333" },
                { price: "35.387" },
                { price: "47.464" },
                { price: "36.733" },
            ],
            Oct: [
                { price: "68.575" },
                { price: "38.333" },
                { price: "10.282" },
                { price: "17.282" },
                { price: "62.373" },
                { price: "37.393" },
                { price: "93.387" },
                { price: "73.383" },
                { price: "83.638" },
                { price: "84.383" },
                { price: "63.360" },
                { price: "28.575" },
                { price: "48.675" },
                { price: "32.975" },
                { price: "40.474" },
                { price: "86.464" },
                { price: "87.644" },
                { price: "54.474" },
                { price: "43.346" },
                { price: "45.474" },
                { price: "45.478" },
                { price: "97.474" },
                { price: "34.373" },
                { price: "26.344" },
                { price: "46.474" },
                { price: "84.484" },
                { price: "63.474" },
                { price: "53.347" },
                { price: "41.393" },
                { price: "35.383" },
                { price: "55.402" },
            ],
            Nov: [
                { price: "39.383" },
                { price: "99.484" },
                { price: "64.474" },
                { price: "40.298" },
                { price: "20.373" },
                { price: "38.384" },
                { price: "83.438" },
                { price: "87.474" },
                { price: "28.473" },
                { price: "60.372" },
                { price: "77.437" },
                { price: "37.386" },
                { price: "48.484" },
                { price: "67.484" },
                { price: "35.464" },
                { price: "64.478" },
                { price: "74.484" },
                { price: "87.484" },
                { price: "48.498" },
                { price: "36.484" },
                { price: "63.383" },
                { price: "87.533" },
                { price: "36.383" },
                { price: "10.108" },
                { price: "16.372" },
                { price: "15.222" },
                { price: "24.381" },
                { price: "90.282" },
                { price: "55.283" },
                { price: "68.575" },
            ],
            Dec: [
                { price: "18.575" },
                { price: "23.575" },
                { price: "44.575" },
                { price: "34.575" },
                { price: "31.575" },
                { price: "45.575" },
                { price: "55.575" },
                { price: "67.575" },
                { price: "55.575" },
                { price: "65.575" },
                { price: "45.575" },
                { price: "43.575" },
                { price: "24.575" },
                { price: "64.575" },
                { price: "54.575" },
                { price: "67.575" },
                { price: "64.575" },
                { price: "44.575" },
                { price: "46.575" },
                { price: "43.575" },
                { price: "33.575" },
                { price: "37.575" },
                { price: "45.575" },
                { price: "23.575" },
                { price: "32.575" },
                { price: "13.575" },
                { price: "43.575" },
                { price: "64.575" },
                { price: "67.575" },
                { price: "62.575" },
                { price: "57.575" },
            ]
        }

        const silverData = new silverModel(obj);
        const saveData = await silverData.save();
        return res.status(201).send(saveData);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.getGoldApi = async (req, res) => {
    try {
        await goldModel.find()
            .then(data => {
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'gold api successfully fetched',
                    data
                })
            }).catch(err => {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'something went wrong',
                })
            })
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error',
        })
    }
}

exports.getSilverApi = async (req, res) => {
    try {
        await silverModel.find()
            .then(data => {
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'silver api successfully fetched',
                    data
                })
            }).catch(err => {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'something went wrong',
                })
            })
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error',
        })
    }
}

exports.getGoldDataByDay = async (req, res) => {
    try {
        const day = req.params.day;
        const goldData = await goldModel.find();
        // console.log(goldData[0].Jan);
        if (day == 0) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of january month',
                'data': goldData[0].Jan
            })
        }
        else if (day == 1) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of february month',
                'data': goldData[0].Feb
            })
        }
        else if (day == 2) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of march month',
                'data': goldData[0].Mar
            })
        }
        else if (day == 3) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of april month',
                'data': goldData[0].Apr
            })
        }
        else if (day == 4) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of may month',
                'data': goldData[0].May
            })
        }
        else if (day == 5) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of june month',
                'data' : goldData[0].Jun
            })
        }
        else if (day == 6) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of july month',
                'data' : goldData[0].Jul
            })
        }
        else if (day == 7) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of augest month',
                'data' : goldData[0].Aug
            })
        }
        else if (day == 8) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of september month',
                'data' : goldData[0].Sep
            })
        }
        else if (day == 9) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of october month',
                'data' : goldData[0].Oct
            })
        }
        else if (day == 10) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of november month',
                'data' : goldData[0].Nov
            })
        }
        else if (day == 11) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of december month',
                'data' : goldData[0].Dec
            })
        }
        else {
            res.status(404).send({
                'statusCode': 404,
                'err': 'data not found, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'something went wrong'
        })
    }
}

exports.getSilverDataByDay = async (req, res) => {
    try {
        const day = req.params.day;
        const silverData = await silverModel.find();
        // console.log(silverData[0].Jan);
        if (day == 0) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of january month',
                'data': silverData[0].Jan
            })
        }
        else if (day == 1) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of february month',
                'data': silverData[0].Feb
            })
        }
        else if (day == 2) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of march month',
                'data': silverData[0].Mar
            })
        }
        else if (day == 3) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of april month',
                'data': silverData[0].Apr
            })
        }
        else if (day == 4) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of may month',
                'data': silverData[0].May
            })
        }
        else if (day == 5) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of june month',
                'data' : silverData[0].Jun
            })
        }
        else if (day == 6) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of july month',
                'data' : silverData[0].Jul
            })
        }
        else if (day == 7) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of augest month',
                'data' : silverData[0].Aug
            })
        }
        else if (day == 8) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of september month',
                'data' : silverData[0].Sep
            })
        }
        else if (day == 9) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of october month',
                'data' : silverData[0].Oct
            })
        }
        else if (day == 10) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of november month',
                'data' : silverData[0].Nov
            })
        }
        else if (day == 11) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of december month',
                'data' : silverData[0].Dec
            })
        }
        else {
            res.status(404).send({
                'statusCode': 404,
                'err': 'data not found, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'something went wrong'
        })
    }
}