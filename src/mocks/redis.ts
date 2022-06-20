const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class MockRedis {
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  async get(_: string) {
    return sleep(2000).then((_) => this.url);
  }

  async set(_: string, __: string) {
    return sleep(2000).then((_) => this.url);
  }
}
