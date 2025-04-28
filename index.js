// Wait for the DOM
let mnemonic = null;  
let single_seed = null ;
 let accountIndex = 0 ; 
 const MAX_ACCOUNTS = 5

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('createWalletBtn');
    const container = document.getElementById('mnemonicContainer');
    const mnemonicEl = document.getElementById('mnemonic');
    const sav = document.getElementById('save'); 
    const bttn = document.getElementById('Account'); 
    

    
  
    btn.addEventListener('click', () => {
      // createRandom() uses BIP39 under the hood
      const wallet = ethers.Wallet.createRandom();
      mnemonic = wallet.mnemonic.phrase;
      
      

  
      // update the UI
      mnemonicEl.textContent = mnemonic;
      container.classList.remove('hidden');
      
    });
    sav.addEventListener('click', () => {
      if (mnemonic) {
        single_seed = ethers.Wallet.fromMnemonic(mnemonic);

      }
      container.remove(); 
      bttn.classList.remove('hidden'); 

      

    });
    bttn.addEventListener('click', () => {

      render(); 


    });

    
  

    
  });
  function account(){
    
    if(!single_seed){
      console.log("Single seed is not generated");
      return null; 
    }
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const path = `m/44'/60'/0'/0/${accountIndex}`; 
    const lm = hdNode.derivePath(path); 
    const ml = new ethers.Wallet(lm.privateKey);
    const publickey = ml.address; 
    
     
    return publickey



  }
  
  function createlement(publickey, accountNumber){
    const div =  document.createElement("div"); 
    // Adding the CSS style 
    div.classList.add("account-card") ;
    const h3 = document.createElement("h3") ;
    h3.innerHTML = `Account ${accountNumber}`; 
    div.appendChild(h3); 
    const h4 = document.createElement("h4"); 
    h4.innerHTML = publickey; 
    div.append(h4);
    return div ; 




  }
  function render() {
    if (accountIndex >= MAX_ACCOUNTS) {
      alert('Maximum limit of 5 accounts reached!');
      document.querySelector("#addAccountBtn").disabled = true;
      return;
  }
   
    const ll = account(); 
    if (!ll ) return ; 
    const accountNumber = accountIndex ; 

    const bank = createlement(ll , accountIndex);
    document.querySelector("#Account").appendChild(bank); 
    accountIndex++ ; 


  }
  




  



