![Version](https://img.shields.io/badge/Version-1.0.0-blue)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/stefanwerfling/toxotidae)
[![Discord](https://img.shields.io/discord/1347133593578766369.svg?label=Discord&logo=discord&color=5865F2&logoColor=white)](https://discord.gg/52PQ2mbWQD)


<h1 align="center">Toxotidae</h1>
<p align="center">
<img src="/doc/images/logo.jpeg" width="300px" style="border-radius: 15px;transition: transform .2s;object-fit: cover;">
<br><br>
Toxotidae (archerfish who spits out a text message) is a TypeScript library that provides an API abstraction for sending SMS messages through the Teltonika TBR140 cellular gateway device. The library handles authentication, session management, and message transmission via HTTP API calls to the TBR140's web interface.
</p>

## Device
What you need is the TRB140 device. The device is integrated into the network with a SIM and a fixed IP.
<table>
<tr>
<td>
<img src="/doc/images/device.jpeg" width="300px" >
</td>
<td>
<img src="/doc/images/interface.jpeg" width="300px" >
</td>
</tr>
</table>


## Installation

You can install Toxotidae via npm:

```bash
npm install git+https://github.com/stefanwerfling/toxotidae.git
```

## Use
Import the class:

```typescript
import {ToxotidaeClient} from 'toxotidae';
```

Next use the client, like the Example:
```typescript
....

try {
    const client = new ToxotidaeClient(baseUrl, username, password);

    await client.login();

    await client.sendSMS(phoneNumber, "Hello from TRB140!");

    await client.logout();    
} catch (e) {
    ....
}

```