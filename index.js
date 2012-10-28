var fs = require('fs');
var gitane = require('gitane');
var path = require('path');


module.exports = function(name, options, callback){
  // Read private key from ~/.ssh/id_rsa
  var keyFile = options.keyFile || '.ssh/id_rsa';
  var privKey = fs.readFileSync(path.join(process.env.HOME, keyFile), 'utf8');
  var baseDir = options.baseDir || process.cwd();
  var repoPath = baseDir + '/' + name;
  fs.mkdirSync(repoPath);
  if(options.readme){
    fs.writeFileSync(repoPath + '/README.md', options.readme);
  }
  if(options.license){
    fs.writeFileSync(repoPath + '/LICENSE', options.license);
  }

  gitane.run(baseDir, privKey, 'git add -A', function(err, stdout, stderr){
    if(err){
      callback(err);
    } else{
      gitane.run(baseDir, privKey, 'git commit -a -m "initial commit"', function(err, stdout, stderr){
        if(err){
          callback(err);
        } else{
          gitane.run(baseDir, privKey, 'git remote add origin ' + options.remote, function(err, stdout, stderr){
            if(err){
              callback(err);
            } else{
              gitane.run(baseDir, privKey, 'git push -u origin master', function(err, stderr, stdout){
                if(err){
                  callback(err);
                } else{
                  callback(undefined);
                }
              });
            }
          });
        }
      });
    }
  });
};