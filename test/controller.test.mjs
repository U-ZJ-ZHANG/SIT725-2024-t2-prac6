import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { registerUser, loginUser, updateMessageView } from '../public/controller.js';

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="message"></div><form id="createAccountForm"></form><form id="loginForm"></form></body></html>`, {
  url: "http://localhost",
  contentType: "text/html",
  includeNodeLocations: true,
  pretendToBeVisual: true
});

global.window = dom.window;
global.document = dom.window.document;

global.fetch = async (url, options) => {
  if (url.includes('/api/register')) {
    return {
      text: async () => 'User registered successfully',
    };
  } else if (url.includes('/api/login')) {
    return {
      text: async () => 'User logged in successfully',
    };
  }
};

describe('Controller.js', () => {
  beforeEach(() => {
    dom.window.document.body.innerHTML = `<div id="message"></div><form id="createAccountForm"></form><form id="loginForm"></form>`;
  });

  describe('registerUser', () => {
    it('should return success message upon registration', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      const message = await registerUser(userData);
      expect(message).to.equal('User registered successfully');
    });
  });

  describe('loginUser', () => {
    it('should return success message upon login', async () => {
      const userData = { username: 'testuser', password: 'password123' };
      const message = await loginUser(userData);
      expect(message).to.equal('User logged in successfully');
    });
  });

  describe('updateMessageView', () => {
    it('should update the message view', () => {
      updateMessageView('Test Message');
      const messageElement = document.getElementById('message');
      expect(messageElement.innerText).to.equal('Test Message');
    });
  });
});