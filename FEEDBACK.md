## 28.01.2020

### Fixes

- [ ] In a javascript project you never commit the `node_modules` to git. [Read here why](https://flaviocopes.com/should-commit-node-modules-git/). Please remove the node_modules folder appropriately using git commands. [Link here](https://stackoverflow.com/questions/50675829/remove-node-modules-from-git-in-vscode).

### Feature requests

- [ ] Implement another table called `companies` to associate the users that you create with companies.
- [ ] The user can be related to only one company, but a company can have multiple users associated
- [ ] In the `/user` related enpoints, return a list of companies together with the user data
- [ ] Create a `/companies` related endpoints to enable create, read, update and delete companies (similar to users)
- [ ] Retrieve all users from a company in endpoint `/companies/:companyId/users`
- [ ] If a company have any users related, it shouldn't throw an error if you try to delete it
- [ ] If a user is realted to a company, the user shouldn't be able to delete as well

### Notes

- Please add the curl scripts so I am able to run the tests in my computer.
