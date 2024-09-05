import inquirer from 'inquirer'
import shelljs from 'shelljs'

inquirer.prompt([
    {
        name: 'componentName',
        message: 'Quel interface voulez-vous créer ?'
    },
]).then(comp => {
    console.info('Service :', comp.componentName);
    const se = comp.componentName;
    shelljs.exec("ng g interface core/models/" + se)
    console.info("Interface créee avec succès")
});
