import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RealWorldFlow } from '../flows/realworld.flow';
import { LoginPage } from '../pages/login.page';
import { HeaderComponent } from '../components/header.component';
import { EditorPage } from '../pages/editor.page';
import { ArticlePage } from '../pages/article.page';
import { UsersApi } from '../api/users.api';
import { generateUserData } from '../test-data/user.data';
import { ApiUser } from '../types/api-user.types';

export { expect } from '@playwright/test';

type Pages = {
  homePage: HomePage;
  realWorld: RealWorldFlow;
  loginPage: LoginPage;
  headerComponent: HeaderComponent;
  editorPage: EditorPage;
  articlePage: ArticlePage;
  apiUser: ApiUser;
};

export const test = base.extend<Pages>({
  apiUser: async ({ request }, use) => {
    const userApi = new UsersApi(request);
    const user = generateUserData();
    const registeredUser = await userApi.registerUserAndReturnData(
      user.username,
      user.email,
      user.password,
    );
    const token = registeredUser.token;
    expect(token).toBeTruthy();
    const apiUser: ApiUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      token,
    };

    await use(apiUser);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);

    await use(headerComponent);
  },

  editorPage: async ({ page }, use) => {
    const editorPage = new EditorPage(page);

    await use(editorPage);
  },

  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);

    await use(articlePage);
  },

  realWorld: async ({ homePage, loginPage, headerComponent, editorPage, articlePage }, use) => {
    const realWorld = new RealWorldFlow(
      homePage,
      loginPage,
      headerComponent,
      editorPage,
      articlePage,
    );

    await use(realWorld);
  },
});
