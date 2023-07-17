import easyinvoice from "easyinvoice";

// const data = {};

async function invoice(data){
    const result = easyinvoice.createInvoice(data);
    await easyinvoice.download('myInvoice.pdf', result.pdf);
}

export default invoice;