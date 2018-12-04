const ContactDataHelper = (elname, inptype, ...attr) => {
    
    const inputData = {};
    
    inputData[elname] = {
        inputtype: inptype,
        inputtonfig: {
            type: attr[0],
            placeholder: attr[1]
        },
        value: ''
    };
    
    return inputData;
}

export default ContactDataHelper;


// name: {
//     elementType: "input",
//     elementConfig: {
//         type: "text",
//         placeholder: "Your Name"
//     },
//     value: ''
// }