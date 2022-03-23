import { test, expect } from '@playwright/test'

test('should navigate to the react page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/')
    // Find an element with the text 'About Page' and click on it
    await page.click('text=React')
    // The new url should be "/project/facebook-react/" (baseURL is used there)
    await expect(page).toHaveURL('/project/facebook-react/')
    // The new page should contain an h3 with "You can deploy..."
    await expect(page.locator('.project')).toContainText('Home')
})