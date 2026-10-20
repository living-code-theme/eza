<!-- living-code-readme:1 -->
# 📁 Living Code for eza

**Calm slate. Living color.** Living Code for eza. Repository-owned theme files, installation instructions and four color flavors.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

<table data-lc-flavors>
<tr>
<td width="50%" valign="top">
<strong>Night</strong><br><sub>Dark · full palette</sub><br><br>
<a href="images/night.png"><img src="images/night.png" alt="eza running Living Code Night" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Frost</strong><br><sub>Dark · softer chroma</sub><br><br>
<a href="images/frost.png"><img src="images/frost.png" alt="eza running Living Code Frost" width="640"></a>
</td>
</tr>
<tr>
<td width="50%" valign="top">
<strong>Paper</strong><br><sub>Light · near-white slate</sub><br><br>
<a href="images/paper.png"><img src="images/paper.png" alt="eza running Living Code Paper" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Signal</strong><br><sub>Dark · teal accent</sub><br><br>
<a href="images/signal.png"><img src="images/signal.png" alt="eza running Living Code Signal" width="640"></a>
</td>
</tr>
</table>

Select any preview to view the image at full size.

## Installation

Needs eza 0.19 or newer. eza reads a single `theme.yml` from `$EZA_CONFIG_DIR`, or else from `${XDG_CONFIG_HOME:-~/.config}/eza/` on Linux and `~/Library/Application Support/eza/` on macOS, so download the flavor you want under that name:

```sh
flavor=night
dir="${EZA_CONFIG_DIR:-${XDG_CONFIG_HOME:-$HOME/.config}/eza}"   # macOS: dir="$HOME/Library/Application Support/eza"
curl -fsSLo "$dir/theme.yml" --create-dirs https://raw.githubusercontent.com/living-code-theme/eza/main/living-code-$flavor.yml
```

Set `flavor` to `frost`, `paper` or `signal` to use another flavor. eza only colors what `LS_COLORS` / `EZA_COLORS` do not already set, so unset those variables if the theme seems to have no effect.

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

<p><a href="images/night.png"><img src="images/night.png" alt="eza running Living Code Night" width="1280"></a></p>

Use `flavor=night` in the installation command to install `living-code-night.yml` as `theme.yml`. eza reads the theme on its next run.

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

<p><a href="images/frost.png"><img src="images/frost.png" alt="eza running Living Code Frost" width="1280"></a></p>

Use `flavor=frost` in the installation command to install `living-code-frost.yml` as `theme.yml`. eza reads the theme on its next run.

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

<p><a href="images/paper.png"><img src="images/paper.png" alt="eza running Living Code Paper" width="1280"></a></p>

Use `flavor=paper` in the installation command to install `living-code-paper.yml` as `theme.yml`. eza reads the theme on its next run.

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

<p><a href="images/signal.png"><img src="images/signal.png" alt="eza running Living Code Signal" width="1280"></a></p>

Use `flavor=signal` in the installation command to install `living-code-signal.yml` as `theme.yml`. eza reads the theme on its next run.

</details>

## Configuration

See [eza's documentation](https://eza.rocks) for application settings and reload behavior. The activation instructions above identify each supported flavor; keep your other application configuration.

## Compatibility

Requires eza 0.19 or newer. LS_COLORS and EZA_COLORS can override theme colors; unset them when checking the theme.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/eza/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
