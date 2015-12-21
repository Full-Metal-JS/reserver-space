Git Workflow        
        
· Only work on feature branches, not on master        
· Commit early, commit often        
         
We will refer to two different masters in the workflow. The blue and red master you don't have to do anything extra, this is just to conceptually understand what is going on.        
        
First, make sure you're on your master branch:  
  · git checkout master
        
Then, while on your master branch: 
  · git pull --rebase upstream master 
        
Then, switch to your feature branch:      
  · git checkout featureBranchName  
Note: If starting a new feature/branch:
  · git checkout -b featureBranchName 
              
Once finished working on feature branch, checkout master, then pull upstream 
  · git checkout master
  · git pull --rebase upstream master              
        
Resolve any conflicts locally       
Then, from within featureBranch, rebase to master:
  · git checkout featureBranchName
  · git rebase master
        
Which moves the entire feature branch to begin on...        
  · git checkout master

the tip of the master branch, incorporating all of the new commits in master        
  · git merge featureBranchName
        
Test out master locally, ensure the build doesn't break       
Note: Remember to switch back to feature branch when continuing to code       
Let the team know that you will submit a Pull Request so they don't push any of their changes       
Push to origin (your fork)        
Submit Pull Request       
