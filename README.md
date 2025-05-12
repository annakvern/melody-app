# Documentation

Git commands used in this project:

### Switch to the development branch

`git checkout development`

### Merge the 'features' branch into 'development'

`git merge features`

### Create a new feature branch from current branch (e.g. development)

`git checkout -b features/add-localstorage`

### Push the new branch to the remote

`git push -u origin features/add-localstorage`

### Rename an existing branch (e.g. 'features' to 'feature-base')

`git branch -m features feature-base`

### Switch to a different branch before deleting current one

`git checkout development`

### Delete the 'features' branch locally

`git branch -d features`

### Delete the 'features' branch remotely

`git push origin --delete features`

### View all local branches

`git branch`

### View all remote branches

`git branch -r`

## Handle merge conflicts

As I worked alone in this project I didn't manage to get any merge conflicts. If I would have encountered one I'd have opened the conflict in VS Code, where it's usually highlighted something like this:

```<<<<<<< HEAD
// your code in development
=======
// conflicting code from add-localstorage
>>>>>>> features/add-localstorage
```

I would look through the code and see what makes sense to save. Remove the bits I think is conflicting and remove the markers. I'd mark the conflict as resolved with: `git add file name` and then `git commit`

In VS Code, I also like using the inline buttons "Accept Current", "Incoming" and "Keep both".
