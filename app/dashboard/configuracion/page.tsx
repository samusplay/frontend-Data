import { getProfiles } from "@/app/actions/profiles.actions";
import ConfigurationManager from "./components/ConfigurationManager";

export default async function ConfiguracionPage() {
  const profilesResult = await getProfiles();

  return (
    <ConfigurationManager
      initialProfiles={profilesResult.success ? profilesResult.data : []}
      initialError={profilesResult.success ? undefined : profilesResult.error}
    />
  );
}
