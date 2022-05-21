/* import moralis */
import Moralis from "moralis/node";
/* Moralis init code */
const serverUrl = "https://ivkroll5t2or.usemoralis.com:2053/server";
const appId = "SIwvl681Px7l3PIhqKGvqFo6dLGpPLNLOrJzwJXa";
const masterKey = "Y9ZGsLaWTHXPLd1KjnOzFPTNGdiOzF3jxILhb7C8";
// 모든 API 호출이 서버를 통과하는 대시에 API로 직접 이동
const moralisSecret =
  "7ITLzD6jKztEsmHweph3zBW8YIN55mErtdkkUyOu7FPcisYBk8U9CiwkxDxMmv9G";

const web3API = async () => {
  // Morail server start
  await Moralis.start({ serverUrl, appId, masterKey });

  /*데이터 저장*/
  // Schema 생성
  const Monster = Moralis.Object.extend("Monster");
  const monster = new Monster();
  // Schema 값 입력
  monster.set("strength", 1024);
  monster.set("ownerName", "Aegon");
  monster.set("canFly", true);
  // 값 저장
  await monster.save();

  /*쿼리*/
  // query 생성
  const query = new Moralis.Query("Monster");
  // query 실행
  const results = await query.find();
  console.log(results);

  /*라이브 쿼리-데이터 변경에 따른 실시간 알림을 위해서 구독*/
  let subscription = await query.subscribe();
  console.log(subscription);

  /*Web3API*/
  const price = await Moralis.Web3API.token.getTokenPrice({
    address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    chain: "bsc",
  });
  console.log(price);

  /*토큰 전달*/
  // Enable web3
  await Moralis.enableWeb3({
    //BSC mainnet
    chainId: 0x38,
    privateKey: "YOUR-PRIVATE KEY",
  });

  // sending 0.5 DAI tokens with 18 decimals on BSC mainnet
  const options: Moralis.TransferOptions = {
    type: "erc20",
    amount: Moralis.Units.Token("0.5", 18),
    receiver: "0x93905fd3f9b8732015f2b3Ca6c16Cbcb60ECf895",
    contractAddress: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  };
  await Moralis.transfer(options).then((result) => {
    console.log(result);
  });
};

web3API();
