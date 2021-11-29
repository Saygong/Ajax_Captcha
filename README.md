# Ajax_Captcha
Third exercise of "Linguaggi per la Rete"

Data la pagina html allegata, contenente un'immagine, un campo di testo ed un pulsante di invio, scrivere una funzione Javascript che gestisca il protocollo di autenticazione (come umano) al server  http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php.
Il server mette a disposizione tre API per l'autenticazione:

- http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&getIdentifier: restituisce una nuova chiave identificativa della sessione alla quale ci si vuole autenticare.

- http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&getImage&id=<sessionid> : permette di richiedere al server l'indirizzo di una nuova immagine (captcha) contenente l'immagine di un testo da rispedire al server per verificare la propria identità umana. (Ad esempio, se l'URL restituito per l'immagine è "captcha//rD6gM4.png", potete visualizzarla nella vostra pagina settando src="http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha//rD6gM4.png")

- http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&sendCode&id=<sessionid>&code=<captcha_code>: permette di inviare l'id della sessione (ottenuto durante la prima chiamata) ed il testo contenuto nell'immagine (inserito dall'utente) al server per autenticarsi. Il server risponderà con un oggetto json {"auth":true} in caso di successo oppure {"auth":false} in caso di fallimento dell'autenticazione.
