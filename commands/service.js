import inquirer from 'inquirer'
import shelljs from 'shelljs'

inquirer.prompt([
    {
        name: 'componentName',
        message: 'Quel service voulez-vous créer ?'
    },
]).then(comp => {
    console.info('Service :', comp.componentName);
    const se = comp.componentName;
    shelljs.exec("ng g s core/services/" + se)
    console.info("Service crée avec succès")
});
