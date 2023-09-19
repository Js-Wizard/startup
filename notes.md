# CS 260 notes

These are notes from the CS 260 course that I will be able to use on exams.

## GitHub

Git is a version control software that has several crucial features for code development, such as:
- Keeping track of changes to code, so that older versions can be restored if needed
- Creating branches to experiment with new features without ruining anything
- Transferring code and changes between devices to facilitate collaboration

GitHub is a cloud-based service that enhances Git with additional features:
- Storing repositories in a central and publicly accessible location
- Advanced project management
- Pull requests, which enable community collaboration
- Fork someone else's repository to make your own version of it, to experiment or contribute
- and more

To create a Git repository with GitHub:
1. Create repository in GitHub
2. Copy clone URL
3. Paste into command line after `git clone` when in the desired location

To modify from development environment:
1. `git pull` to get latest version from GitHub
2. Modify files as desired
3. `git add` on modified files to apply changes to
4. `git commit -m "(message)"` to locally commit changes
5. Repeat 2-4 for each major set of changes
6. `git push` to apply to GitHub repository

Other Git commands:
- `git fetch` updates cache with information about the state of the GitHub repository
- `git status` evaluates difference between GitHub cache and local files

GitHub .md files use _markdown_, which is syntax to represent visual elements applied to the text.

## Internet

- Layers (TCP/IP model)
  - Application
    - For example, HTTPS
    - Application implementation
  - Transport
    - For example, TCP/UDP
    - Creates stable connections and ensures data reaches its destination
  - Internet
    - IP
    - Sends data between systems
    - Use `traceroute` to get points along route to a certain address
  - Link
    - Fiber, hardware
    - Phyically connects machines
- Protocols
  - Application
    - HTTP
      - Original web application protocol
      - Use `curl` to make an HTTP request
    - HTTPS
      - HTTP but secure
      - Uses TLS
      - `curl -v` will show TLS handshake
    - TLS
      - Wrapper for transport layer that encrypts sent data

## Tools
- DNS
  - Register IP address corresponding to the server
  - Commands
    - Run `dig` to get ip address of domain from DNS
    - Run `whois` to get informatino about the owner of a domain
  - TLD: top level domain
    - Rightmost
    - e.g. com, edu
    - Managed by ICANN
  - Secondary domain
    - Second-to-rightmost
    - Managed by authoritative name servers
  - Subdomains
    - Third, fourth, etc
    - Managed by owner of a root domain
  - Root domain: secondary domain + TLD
  - DNS records:
    - A: ip address corresponding to a domain name
    - NS: authoritative name servers that are listed in the registrar
    - SOA: contact information for owner
- Gateway
  - Redirects inputs to specific services
  - Our tool: Caddy
    - Serves static files directly
    - Sends service requests to specific services
  - Services are linked to subdomains
- Web certificate issuer
  - Generates and issues TLS certificates
  - Let's Encrypt does this for free and is used by Caddy
- HTML
  - Hyper Text Markup Language
  - Elements
    - Structure:
      - Open tag
        - `<name att="val" ...>`
        - May contain attributes
      - Content
        - Between opening and closing tag
      - Closing tag
        - `</name>`
        - Can put in opening tag: `<name ... />`
    - Types:
      - `<!DOCTYPE html>`
        - Notifies browser that this uses the new version of HTML
      - `<title>`
        - Sets name of browser tab
      - `<div>`
        - Generic page element, containing other elements
      - `<img>`
        - `alt`: Name of image, used if picture cannot be seen
        - `src`: URL of source image
  - Escape character: `&`
  - DOM
    - Document Object Model
    - Tree structure representing relationship between elements
    - Can represent HTML, CSS, Javascript
    - Defined by code
  - For further information
    - MDN WebDocs
    - w3schools

## Startup
- Access
  - Public IP: 54.164.246.196
  - Domain: fimgame.click
  - SSH: `ssh -i ~/CS260/demokey260.pem ubuntu@fimgame.click`
