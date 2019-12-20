import { AppConfig, getFile, putFile, lookupProfile, Person } from 'blockstack';

export const appConfig = new AppConfig(['store_write', 'publish_data']);

const timerFileName = 'abstractTimer.json';
const calendarFileName = 'abstractCalendar.json';

export class BlockstackUtils {
    static getUserProfile = username =>
        new Promise(function(resolve, reject) {
            lookupProfile(username)
                .then(profile => {
                    if (!profile) resolve(null);

                    const person = new Person(profile);
                    resolve({
                        username: username,
                        name: person.name(),
                        avatarUrl: person.avatarUrl(),
                    });
                })
                .catch(err => reject(err));
        });

    static getCalendars = () => BlockstackUtils._get(calendarFileName);

    static setCalendars = calendarsInfo =>
        BlockstackUtils._save(calendarFileName, calendarsInfo);

    static getTimers = () => BlockstackUtils._get(timerFileName);

    static setTimers = timers => BlockstackUtils._save(timerFileName, timers);

    static _save = (fileName, data) =>
        new Promise(function(resolve, reject) {
            putFile(fileName, JSON.stringify(data))
                .then(() => resolve())
                .catch(err => reject(err));
        });

    static _get = fileName =>
        new Promise(function(resolve, reject) {
            getFile(fileName)
                .then(file => {
                    if (!file) resolve([]);

                    resolve(JSON.parse(file));
                })
                .catch(err => reject(err));
        });
}
