class AppConfig {

    private readonly baseUrl = process.env.REACT_APP_BASE_URL;

	public readonly booksUrl = this.baseUrl + "api/books/";
	public readonly tagsUrl = this.baseUrl + "api/tags/";
	public readonly readingStatusUrl = this.baseUrl + "api/reading-status/";
	public readonly registerUrl = this.baseUrl + "api/register/";
	public readonly loginUrl = this.baseUrl + "api/login/";
}

export const appConfig = new AppConfig();
