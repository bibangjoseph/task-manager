import inquirer from 'inquirer'
import shelljs from 'shelljs'

inquirer.prompt([
  {
    name: 'componentName',
    message: 'Quel est le nom de la page ?'
  },
]).then(comp => {
  console.info('Page :', comp.componentName);
  const c = comp.componentName;
  inquirer.prompt([
    {
      name: 'moduleName',
      message: 'Dans quel Module ?'
    },
  ]).then(mod => {
    console.info('Module :', mod.moduleName);
    const module = mod.moduleName;
    shelljs.exec("ng g c views/" + module + "/" + c)
    console.info("Page créee avec succès")
  });
});
