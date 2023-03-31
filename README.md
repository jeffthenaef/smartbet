zbudować apkę reacta i wrzucić na volumen współdzielony
podpiąć voluemn wspóldzielony z apką jako server/public
postawić server noda
postawic server nginxa wskazujacy na wolumen współdzielony

https://ashwin9798.medium.com/nginx-with-docker-and-node-js-a-beginners-guide-434fe1216b6b







# Repo Starter

1. Create React App
2. React App Rewired -  https://github.com/timarney/react-app-rewired
3. Redux as store management with duck methodology
4. Styling made with CSS/SASS modules `module.sass` or with standard CSS/SASS `.sass`.
5. Hot reload
6. Eslint

##### Eslint made with Airbnb config and some custom tweaks

It can be disabled in `./config-overrides.js` by disabling using eslintrc out lines or tweaking it in `./eslintrc`:












logika sprzedazy i kupna na giełdzie

Mamy usera 0x222 - userB
Mamy usera 0x333 - userA

Mamy buyorderbook na 0x999
Mamy sellorderbook na 0x888

mamy token na 0x123
mamy eth na 0x000


# "user 0x222 chciałby sprzedać 10 tokenów 0x123 za 1 eth"
```javascript
teamtokenContract.approve(sellorderbook.address, 10*10e18, {from: userB})
order1 = sellorderbook.create(0x123, 1* 10e18, 0x000, 1* 10e18 {from: userB})
```

# "user 0x333 chce kupić order usera 0x222"
```javascript
// wg readme jest buyorderbook, ale przeciez order1 nie nalezy do buyorderbooka
sellorderbook.finalize(order1Nonce, {
    value:1* 10e18
    from: userA
})
```



# "user 0x222 chciałby kupić 10 tokenów 0x123 za 1 eth"
```javascript
order2 = buyorderbook.create(
    0x000, 1* 10e18,
    0x123, 10* 10e18,
    {from: userB, value:1* 10e18})
```

# "user 0x333 chce sprzedać userowi 0x222 10 tokenów 0x123"
```javascript
teamtokenContract.approve(buyorderbook.address, 1*10e18, {from: userB}) - done
buyorderbook.finalize(order2Nonce, {
    from: userA
})
```
