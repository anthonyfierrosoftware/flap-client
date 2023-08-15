interface ApiResult<D> {
  error: any;
  loading: boolean;
  data: D;
}

interface ApiInfoData {
  application: string;
  version: string;
}

interface School {
  School: string;
  Website: string;
  CDSCode: string;
}

interface Part {
  name: string;
  amount: number;
  id?: string;
}

type SchoolsData = Map<string, School>;

interface FlapReduxState {
  apiInfo: ApiResult<ApiInfoData>;
  schools: ApiResult<SchoolsData>;
}

interface LocalReduxState {
  parts: Part[];
}

interface ReduxState {
  flap: FlapReduxState;
  local: LocalReduxState;
}
