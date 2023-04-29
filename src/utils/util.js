
//wait function or delay function 
export default function timeout(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}