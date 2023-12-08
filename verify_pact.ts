require("dotenv").config();
import { Verifier } from "@pact-foundation/pact";

const PACT_BROKER_BASE_URL = process.env.PACT_BROKER_BASE_URL;
const PACT_BROKER_TOKEN = process.env.PACT_BROKER_TOKEN;

if (PACT_BROKER_BASE_URL === undefined || PACT_BROKER_TOKEN === undefined) {
  throw new Error("Failed to retrieve pact details - github actions.");
}

const provider = {
  provider: "teamo-banter-exampe-provider",
  providerBaseUrl: "http://localhost:8080",
  providerVersion: "1.0.0",
};

const verifyProviders = async () => {
  const opts = {
    provider: provider.provider,
    providerBaseUrl: provider.providerBaseUrl,
    providerVersionBranch: provider.providerVersion,
    providerVersionTags: [provider.providerVersion],
    consumerVersionSelectors: [{ latest: true }],
    providerVersion: provider.providerVersion,
    pactBrokerUrl: PACT_BROKER_BASE_URL,
    pactBrokerToken: PACT_BROKER_TOKEN,
    publishVerificationResult: true,
  };

  await new Verifier(opts).verifyProvider();
};

verifyProviders().then((_) => console.log("Verified contracts."));
