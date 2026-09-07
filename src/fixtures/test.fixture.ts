import { test as base, expect, APIRequestContext } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RealWorldFlow } from '../flows/realworld.flow';
import { LoginPage } from '../pages/login.page';
import { HeaderComponent } from '../components/header.component';
import { EditorPage } from '../pages/editor.page';
import { ArticlePage } from '../pages/article.page';
import { UsersApi } from '../api/users.api';
import { generateUserData } from '../test-data/user.data';
import { ApiUser } from '../types/api-user.types';
import { SignUpPage } from '../pages/signUp.page';
import { ProfilePage } from '../pages/profile.page';
import { SettingsPage } from '../pages/settings.page';
import { ArticlesApi } from '../api/articles.api';

export { expect } from '@playwright/test';

type Pages = {
  homePage: HomePage;
  realWorld: RealWorldFlow;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  headerComponent: HeaderComponent;
  editorPage: EditorPage;
  articlePage: ArticlePage;
  apiUser: ApiUser;
  authorUser: ApiUser;
  readerUser: ApiUser;
  profilePage: ProfilePage;
  settingsPage: SettingsPage;
  articlesApi: ArticlesApi;
};

const createApiUser = async (request: APIRequestContext): Promise<ApiUser> => {
  const userApi = new UsersApi(request);
  const user = generateUserData();
  const registeredUser = await userApi.registerUserAndReturnData(
    user.username,
    user.email,
    user.password,
  );
  const token = registeredUser.token;
  expect(token).toBeTruthy();
  return {
    username: user.username,
    email: user.email,
    password: user.password,
    token,
  };
};

export const test = base.extend<Pages>({
  apiUser: async ({ request }, use) => {
    const apiUser = await createApiUser(request);

    await use(apiUser);
  },

  authorUser: async ({ request }, use) => {
    const authorUser = await createApiUser(request);

    await use(authorUser);
  },

  readerUser: async ({ request }, use) => {
    const readerUser = await createApiUser(request);

    await use(readerUser);
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

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);

    await use(profilePage);
  },

  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);

    await use(settingsPage);
  },

  articlesApi: async ({ request }, use) => {
    const articlesApi = new ArticlesApi(request);

    await use(articlesApi);
  },

  realWorld: async (
    {
      homePage,
      loginPage,
      headerComponent,
      editorPage,
      articlePage,
      signUpPage,
      profilePage,
      settingsPage,
    },
    use,
  ) => {
    const realWorld = new RealWorldFlow(
      homePage,
      loginPage,
      headerComponent,
      editorPage,
      articlePage,
      signUpPage,
      profilePage,
      settingsPage,
    );

    await use(realWorld);
  },
});
