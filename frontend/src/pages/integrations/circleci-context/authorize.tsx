import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { faArrowUpRightFromSquare, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Card, CardTitle, FormControl, Input } from "@app/components/v2";
import { useSaveIntegrationAccessToken } from "@app/hooks/api";

export default function CircleCIContextCreateIntegrationPage() {
  const router = useRouter();
  const { mutateAsync } = useSaveIntegrationAccessToken();

  const [apiKey, setApiKey] = useState("");
  const [apiKeyErrorText, setApiKeyErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      setApiKeyErrorText("");
      if (apiKey.length === 0) {
        setApiKeyErrorText("API Key cannot be blank");
        return;
      }

      setIsLoading(true);

      const integrationAuth = await mutateAsync({
        workspaceId: localStorage.getItem("projectData.id"),
        integration: "circleci-context",
        accessToken: apiKey
      });

      setIsLoading(false);

      router.push(`/integrations/circleci-context/create?integrationAuthId=${integrationAuth.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Head>
        <title>Authorize CircleCI Context Integration</title>
        <link rel="icon" href="/infisical.ico" />
      </Head>
      <Card className="mb-12 max-w-lg rounded-md border border-mineshaft-600">
        <CardTitle
          className="px-6 text-left text-xl"
          subTitle="After adding your API Token, you will be prompted to set up an integration for a particular Infisical project and environment."
        >
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/images/integrations/CircleCI.png"
                height={30}
                width={30}
                alt="CircleCI logo"
              />
              <span className="ml-1.5">CircleCI Context Integration </span>
            </div>
            <Link
              href="https://infisical.com/docs/integrations/cicd/circleci-context"
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <div className="ml-2 mb-1 flex cursor-pointer flex-row items-center gap-1.5 rounded-md bg-yellow/20 px-1.5 pb-[0.03rem] pt-[0.04rem] text-sm text-yellow opacity-80 hover:opacity-100">
                <FontAwesomeIcon icon={faBookOpen} />
                Docs
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="mb-[0.07rem] text-xxs"
                />
              </div>
            </Link>
          </div>
        </CardTitle>
        <FormControl
          label="CircleCI API Token"
          errorText={apiKeyErrorText}
          isError={apiKeyErrorText !== "" ?? false}
          className="px-6"
        >
          <Input placeholder="" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        </FormControl>
        <Button
          onClick={handleButtonClick}
          colorSchema="primary"
          variant="outline_bg"
          className="mb-6 mt-2 ml-auto mr-6 w-min"
          isLoading={isLoading}
        >
          Connect to CircleCI
        </Button>
      </Card>
    </div>
  );
}

CircleCIContextCreateIntegrationPage.requireAuth = true;
