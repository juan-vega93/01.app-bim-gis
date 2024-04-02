const button = document.getElementById("input-button");
const input = document.getElementById("input-element");
console.log("button");
button.onclick = () => {
    input.click();
}; 

input.onchange = (changed) => {
    const reader = new FileReader();
        reader.onload = () => LoadIfc(reader.result);
        reader.readAsText(changed.target.files[0]);
};

function LoadIfc(ifcData) {
    console.log(ifcData);


}
