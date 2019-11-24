const dev = process.env.NODE_ENV !== 'production';
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const next = require('next');
const expressHealthcheck = require('express-healthcheck');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });

const path = require('path');
const shrinkRay = require('shrink-ray-current');

const handle = app.getRequestHandler();

function setupRobotsTXT(server) {
    const robotsOptions = {
        root: __dirname + '/public/',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
        }
    };
    server.get('/robots.txt', (req, res) => (
        res.status(200).sendFile('robots.txt', robotsOptions)
    ));
}

function setupSiteMapXML(server) {
    const siteMapOptions = {
        root: __dirname + '/public/',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
        }
    };
    server.get('/sitemap.xml', (req, res) => (
        res.status(200).sendFile('sitemap.xml', siteMapOptions)
    ));
}

function setupFavicon(server) {
    const faviconOptions = {
        root: __dirname + '/public/'
    };
    server.get('/favicon.ico', (req, res) => (
        res.status(200).sendFile('favicon.ico', faviconOptions)
    ));
}

function setupServiceWorker(server) {
    server.get('/service-worker.js', (req, res) => {
        // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Content-Type', 'application/javascript');
        app.serveStatic(req, res, path.resolve('./.next/service-worker.js'));
    });
}

const createServer = () => {
    const server = express();

    // Compressing all assets in dev slows things down.
    // Only use this in production if your assets are cdn cached and proxy doesn't do br natively
    if (!dev) {
        server.use(shrinkRay());
    }

    // Handle trailing slash
    server.use(function (req, res, next) {
        if (req.path.substr(-1) === '/' && req.path.length > 1) {
            const query = req.url.slice(req.path.length);
            res.redirect(301, req.path.slice(0, -1) + query);
        } else {
            next();
        }
    });

    server.use('/health', expressHealthcheck());

    setupRobotsTXT(server);
    setupSiteMapXML(server);
    setupFavicon(server);

    // Service worker file gets created by next-offline
    // If you test in production mode, remember to manually unregister the production service worker after
    setupServiceWorker(server);

    server.get('/api/ip', (req, res) => {
        const ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        return res.send({ip});
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    return server;
};

const server = createServer();
app.prepare()
    .then(() => {
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });

exports.app = app;
exports.server = server;
