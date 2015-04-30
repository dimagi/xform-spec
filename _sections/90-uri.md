---
title: URI Support
---

Throughout the XForm format URIs are used to refer to resources outside of the XForm itself. The `jr` "protocol" is used to indicate the resource is available in a sandboxed environment the client is aware of. We can divide the supported URIs into two groups: _binary_ and _virtual_.

### Binary Endpoints

Binary endpoints point to files. The following are supported:

| URI format                                 | description 
|--------------------------------------------|----------------
| `jr://images/path/to/file.png`             | points to an image resource in the sandboxed environment
| `jr://audio/path/to/file.mp3`              | points to an audio resource in the sandboxed environment
| `jr://video/path/to/file.mp4`              | points to a video resource in the sandboxed environment

Planned for the future:

|--------------------------------------------|------------
| `jr://file/FILENAME.xml`                   | points to an XML resource in the sandboxed enviroment.[enketo](# "Already supported in Enketo, and so is jr://file-csv.")
| `http://domain.com/path/to/file`           | points to a publicly available resource on the web. [review](# "really?") [enketo](# "Not supported in Enketo.") 

### Virtual Endpoints

These URIs refer to "virtual" documents that are available within the current client environment. Examples of URI variants that are supported across CommCare apps (though not in every app):

| URI format                                 | description 
|--------------------------------------------|----------------
| `jr://instance/casedb`                     | points to all locally stored cases (see the [CaseDb Specification](https://github.com/dimagi/commcare/wiki/casedb))
| `jr://instance/session`                    | points to the current session variables, aka [metadata](#metadata) (see the [Session Specification](https://github.com/dimagi/commcare/wiki/commcaresession))
| `jr://instance/fixture/FIXTUREID`          | points to a fixture (see the [Fixture Specification](https://github.com/dimagi/commcare/wiki/fixtures))
| `jr://instance/ledgerdb`                   | points to a ledger (see the [LedgerDb Specification](https://github.com/dimagi/commcare/wiki/ledgerdb))
